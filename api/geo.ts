export const config = { runtime: 'edge' }

export default function handler(request: Request) {
  const country = request.headers.get('x-vercel-ip-country')

  return Response.json(
    { country: country ?? null },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=3600',
      },
    },
  )
}
