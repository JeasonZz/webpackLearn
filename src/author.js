class Author {
  name = "ITEM";
  age = 18;
  email = "asd@16.com";
  info = () => {
    return {
      name: this.name,
      age: this.age,
      email: this.email,
    };
  };
}

module.exports = Author;