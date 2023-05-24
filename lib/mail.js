import emailjs from "@emailjs/browser"
import * as envs from "envs"

async function fakeSend() {
  return new Promise(resolve => setTimeout(() => resolve(true), 2000))
}

export async function send(from, message, senderEmail) {
  if (envs.isDev) return fakeSend()
  const response = await emailjs.send(envs.emailServiceId, "template_7mm52o9", {
    sender: from.trim(),
    message: message.trim(),
    senderEmail: senderEmail.trim(),
  }, envs.emailPublicKey)
  if (response.status === 200) return true
  return false
}
