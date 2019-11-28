import path from "path";
const spawn = require("child_process").spawn;

export default class Predictor {
  constructor() {}

  predictBreed(userId: string, files: string[]) {
    return new Promise((resolve, reject) => {
      if (files.length == 0) {
        resolve();
      }
      const pathUser = path.resolve(
        __dirname,
        "../uploads/",
        userId,
        "posts",
        files[0]
      );
      const pythonProcess = spawn("py", ["../predict.py", pathUser]);
      pythonProcess.stdout.on("data", (data: any) => {
        console.log(data.toString());
        resolve(1);
      });
    });
  }
}
