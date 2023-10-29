test("getting auth data info", () => {
  expect(
    (handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(
          "https://neural-feed-backend.onrender.com/api/auth/login",
          {
            ...inputValue,
          },
          { withCredentials: true }
        );
        console.log(data);
        const { success, message } = data;
        if (success) {
          handleSuccess(message);
          setTimeout(() => {
            navigate("/");
          }, 1000);
        } else {
          handleError(message);
        }
        console.log(data.user.id);
      } catch (error) {
        console.log(error.message);
      }
      setInputValue({
        ...inputValue,
        email: "",
        password: "",
      });
    })
  ).toBe(data.user.id);
});
