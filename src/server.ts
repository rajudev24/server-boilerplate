import app from "./app";
import config from "./config";

async function main() {
  try {
    console.log(`Database Connected Successfully`);
    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(`Application listening on port ${config.port}`);
  }
}

main();
