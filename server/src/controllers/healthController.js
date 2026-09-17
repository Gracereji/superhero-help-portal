/**
 * Health Controller
 * Provides operational status of the server and foundational metadata for AURA
 */
export const getHealthStatus = (req, res) => {
  res.status(200).json({
    status: 'online',
    message: 'AURA Help Portal API systems operational.',
    timestamp: new Date().toISOString(),
    hero: {
      name: 'AURA',
      title: 'The Guardian of Human Potential',
      personality: ['intelligent', 'kind', 'calm', 'encouraging', 'slightly humorous'],
      mission: 'Help ordinary people find a path forward when they are facing problems.'
    }
  });
};
