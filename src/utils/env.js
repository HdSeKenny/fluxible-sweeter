export default {
  is_client: typeof window !== 'undefined',
  is_server: typeof window === 'undefined'
};
