import { assertEquals, assert } from "https://deno.land/std/testing/asserts.ts";
import { readJsonSync } from "https://deno.land/std/fs/read_json.ts";
import { writeJsonSync } from "https://deno.land/std/fs/write_json.ts";

import { jsonSort, checkObject } from "./jsonSort.ts";

const path = "./test.json";
const originalJson = readJsonSync(path);

Deno.test({
  name: "jsonSort",
  fn() {
    jsonSort(path);
    const resultJson = checkObject(readJsonSync(path));
    const result = JSON.stringify(resultJson);

    const comp = JSON.stringify(checkObject(readJsonSync("./comparison.json")));

    // 並べたあとの結果を書き込む
    writeJsonSync("./result.json", resultJson, { spaces: 4 });
    // テスト実行前のJSONへ戻す処理
    writeJsonSync(path, originalJson, { spaces: 4 });

    assertEquals(comp, result, "並び替えに失敗しています");
  },
});
