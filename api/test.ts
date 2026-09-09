// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const process: any

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function handler(_req: any): Promise<any> {
  const envKeys = Object.keys(process.env || {}).filter(k => k.includes('DATABASE') || k.includes('VERCEL'))
  return Response.json({
    message: 'API is working!',
    envKeys,
    hasDbUrl: !!process.env.DATABASE_URL,
    nodeVersion: process.version,
  })
}
