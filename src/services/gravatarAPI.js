const getGavatarAPI = async (hash) => {
  const requestAPI = await fetch(`https://www.gravatar.com/avatar/${hash}`);
  return requestAPI;
};

export default getGavatarAPI;
