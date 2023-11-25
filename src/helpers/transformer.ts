const resTransformer: any = (paramsInput: object | object[]) => {
  let entityTransformed: object[] = [];
  const params = JSON.parse(JSON.stringify(paramsInput));
  if (params && Array.isArray(params)) {
    params.forEach((enumObj) => {
      entityTransformed.push(resEntity(enumObj));
    });
    return entityTransformed;
  }

  return resEntity(params);
};

// if  the entity is object
const resEntity = (menuObj: any) => {
  let data = menuObj;

  Object.keys(data).forEach((key) => {
    // remove is_deleted, __v, and audit_trails attributes
    if (key == "__v" || key == "password" || key == "orders") {
      delete data[key];
    }
  });

  return data;
};

export { resTransformer };

