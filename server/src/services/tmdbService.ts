
const TMDB_API_URL = process.env.TMDB_API_URL
const TMDB_API_KEY = process.env.TMDB_API_KEY

export const fetchFromTMDB = async (endpoint: string) => {
  const response = await fetch(`${TMDB_API_URL}/${endpoint}`, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${TMDB_API_KEY}`,
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch from TMDB')
  }

  return response.json()
}
