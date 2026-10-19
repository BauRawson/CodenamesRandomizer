import { parseArgs } from 'node:util'

export function campaignLink({ source, campaign, content, medium = 'organic_social' }) {
  const fields = { utm_source: source, utm_medium: medium, utm_campaign: campaign, utm_content: content }
  for (const [key, value] of Object.entries(fields)) {
    if (!value || !/^[a-z0-9_-]{1,100}$/i.test(value)) throw new Error(`${key}: use 1–100 letters, numbers, underscores, or hyphens. Do not use personal information.`)
    fields[key] = value.toLowerCase()
  }
  return `https://michicho.com/theking?${new URLSearchParams(fields)}`
}

if (process.argv[1] && import.meta.url === new URL(process.argv[1], 'file:').href) {
  try {
    const { values } = parseArgs({ options: Object.fromEntries(['source', 'campaign', 'content', 'medium'].map(key => [key, { type: 'string' }])) })
    console.log(campaignLink(values))
  } catch (error) { console.error(error.message); process.exitCode = 1 }
}
