import validate from 'validate.js';

class ValidationError {
  result: any;
  constructor(error: any) {
    this.result = error;
  }
}

export default (attribute: any, constraints: any) => {
  const result = validate(attribute, constraints);

  if (result) {
    const errors = Object.keys(result).map((x: string) => ({
      field: x,
      error: result[x],
    }));

    return new ValidationError(errors);
  }

  return null;
};
