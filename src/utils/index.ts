export const isObject = (value: any) => {
  return typeof value === "object";
};

export const recursiveObjects = <T>(objects: any, name: string): T => {
  const items = objects;
  if (!isObject(items)) {
    throw new Error("not object");
  }
  const result = [] as string[];
  const recursive = (objects: any, name: string): any => {
    if (!isObject(objects) || !objects) {
      result.push(name);
      return result;
    } else if (isObject(objects)) {
      for (const object in objects) {
        recursive(objects[object], name + "." + object);
      }
      return result;
    }
  };

  return recursive(items, name);
};
