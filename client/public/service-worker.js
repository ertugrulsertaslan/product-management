self.addEventListener("push", (event) => {
  const data = event.data.json();
  const { title, body, icon } = data.notification;

  event.waitUntil(
    self.registration.showNotification(title, {
      body: body,
      icon: icon,
    })
  );
});
