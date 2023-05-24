import { initializeApp } from "firebase/app";
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import { doc, getDoc, getFirestore, updateDoc, increment, setDoc, serverTimestamp } from "firebase/firestore"
import { getValue, getRemoteConfig, setLogLevel, fetchAndActivate } from "firebase/remote-config"
import defaultConfig from "consts/defaultConfig";
import * as envs from 'envs'
import pkg from 'package.json'

export const config = {
  apiKey: envs.firebaseApiKey,
  authDomain: envs.firebaseAuthDomain,
  projectId: envs.firebaseProjectId,
  storageBucket: envs.firebaseStorageBucket,
  messagingSenderId: envs.firebaseMessagingSenderId,
  appId: envs.firebaseAppId
};

const app = initializeApp(config)

export const user = () => {
  const firestore = getFirestore(app)
  const coll = envs.isDev ? `${pkg.name}-users-dev` : `${pkg.name}-users`
  const getUserVisitorId = async () => {
    const fp = await FingerprintJS.load()
    const { visitorId } = await fp.get()
    return visitorId
  }
  const getVisitorId = getUserVisitorId()
  return {
    set: {
      post: (slug) => {
        return {
          like: async () => {
            return await setDoc(doc(firestore, coll, await getVisitorId), {
              [slug]: { isLiked: true, updated: serverTimestamp() }
            }, { merge: true })
          },
          dislike: async () => {
            return await setDoc(doc(firestore, coll, await getVisitorId), {
              [slug]: { isLiked: false, updated: serverTimestamp() }
            }, { merge: true })
          }
        }
      }
    },
    get: {
      post: (slug) => {
        return {
          isLiked: async () => {
            return (await getDoc(doc(firestore, coll, await getVisitorId))).get(slug)?.isLiked
          }
        }
      }
    }
  }
}

const post = (slug) => {
  const firestore = getFirestore(app)
  const coll = envs.isDev ? `${pkg.name}-posts-dev` : `${pkg.name}-posts`
  return {
    get: {
      views: {
        increment: async () => {
          return await updateDoc(doc(firestore, coll, slug), {
            views: increment(1)
          })
          .then(() => ({
            ok: true,
            notFound: () => false
          }))
          .catch(error => ({
            ok: false,
            notFound: () => error.code === 'not-found'
          }))
        },
        data: async () => {
          const snap = await getDoc(doc(firestore, coll, slug))
          return snap.data()?.views || 1
        }
      }
    },
    add: async () => {
      await setDoc(doc(firestore, coll, slug), { views: 1 })
    }
  }
}

export const feat = async (key) => {
  const remoteConfig = getRemoteConfig(app)
  const logLevel = envs.isDev ? 'debug' : 'silent'
  const minimumFetchIntervalMillis = envs.isDev ? 60000 : 43200000
  remoteConfig.defaultConfig = defaultConfig
  remoteConfig.settings.minimumFetchIntervalMillis = minimumFetchIntervalMillis
  setLogLevel(remoteConfig, logLevel)
  await fetchAndActivate(remoteConfig)
  const val = getValue(remoteConfig, key)
  return {
    is: ({
      enabled() {
        return val.asBoolean() === true
      },
    })
  }
}

export const blog = { post }
