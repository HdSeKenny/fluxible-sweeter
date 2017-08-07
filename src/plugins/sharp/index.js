import sharp from 'sharp';
import fs from 'fs';
import { jsUtils } from '../../utils';

export default (req, res) => {
  const fileName = jsUtils.splitUrlBySlash(req.body.uri, 1)[0];
  const envDir = jsUtils.splitUrlBySlash(__dirname, 3)[2];
  const envIndex = __dirname.indexOf(envDir);
  const projectDir = __dirname.substring(0, envIndex - 1);
  const srcTarget = `${projectDir}/src/public/styles/images/lqip/users/${fileName}`;
  const envTarget = `${projectDir}/${envDir}/public/styles/images/lqip/users/${fileName}`;
  const originalUrl = `${projectDir}/src/public${req.body.uri}`;

  sharp(originalUrl)
    .resize(50)
    .toBuffer()
    .then(async (data) => {
      try {
        await fs.writeFile(srcTarget, data);
        await fs.writeFile(envTarget, data);

        res.status(200).json(srcTarget);
      } catch (err) {
        throw new Error(err);
      }
    })
    .catch(err => {
      if (err) throw err;
    });
};
