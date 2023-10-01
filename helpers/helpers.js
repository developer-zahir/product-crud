// get unick random id
export const getRandomUniqueId = () => {
  // Generate a random number between 0 and 1000000000.
  const randomNumber = Math.floor(Math.random() * 1000000000);

  // Get the current timestamp in milliseconds.
  const timestamp = Date.now();

  // Combine the random number and timestamp to create a unique ID.
  const uniqueId = `${randomNumber}_${timestamp}`;

  // Return the unique ID.
  return uniqueId;
};

// create product slug from product name

export const createSlug = (name) => {
  // Convert the name to lowercase and replace space whit hyphns.
  const slug = name.toLowerCase().replace(/\s+/g, "-");

  // Remove any specila charecters or symbols
  const cleanedSlug = slug.replace(/[^a-z0-9-]/g, "");
  return cleanedSlug;
};


