import validate from './validate';
const constraints = {
  username: {
    email: true,
  },
  password: {
    presence: true,
    exclusion: {
      within: ['123'],
      message: "'%{value}' is not allowed",
    },
    length: {
      minimum: 5,
      message: 'must be at least 6 characters',
    },
  },
};

export default (attribute: any) => {
  return validate(attribute, constraints);
};
