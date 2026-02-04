export const assertGetElementById = (id: string) => {
  const element = document.getElementById(id);
  if (!element) throw new Error(`Element with id '${id}' not found`);
  return element;
};

export const registerServiceWorker = async () => {
  if (!navigator.serviceWorker) return;

  const registration = await navigator.serviceWorker.register("sw.js", {
    type: "module",
    scope: "/",
  });

  if (registration.active) await registration.update();
};
