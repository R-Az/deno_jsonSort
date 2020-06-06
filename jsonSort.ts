import { writeJsonSync } from "https://deno.land/std/fs/write_json.ts";
import { readJsonSync } from "https://deno.land/std/fs/read_json.ts";

export const checkObject = (arg: any) => {
  if (typeof arg !== "object") {
    throw new Error("typeError: not object");
  }
  return arg;
};

/**
 * JSONファイルを読み込んで並び替えします。
 * @param {string} path 対象JSONファイルのパス
 */
export const jsonSort = (path: string) => {
  const read_json = checkObject(
    readJsonSync(path),
  );

  const write_json: { [index: string]: any } = {};
  const keys: string[] = [];

  Object.keys(read_json).forEach(((key) => keys.push(key)));
  keys.sort();

  keys.forEach((key) => write_json[key] = read_json[key]);

  writeJsonSync(path, write_json, { spaces: 4 });
};
