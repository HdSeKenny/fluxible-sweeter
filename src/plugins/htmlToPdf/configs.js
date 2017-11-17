import configs from '../../configs';

export default {
  waitUtilOptions: ['domcontentloaded', 'networkidle0'],
  pdfOptions: {
    path: '111.pdf',
    printBackground: true,
    landscape: true,
    format: 'A4',
    margin: {
      top: 10,
      right: 10,
      bottom: 10,
      left: 10
    }
  },
  stylesheets: [
    'css/font-awesome.min.css',
    'css/sweetalert2.min.css',
    'css/slim.min.css',
    'css/emoji.css',
    'slick/slick.min.css',
    'slick/slick-theme.min.css',
    'css/pdf.css'
  ],
  stylesPath: `http://${configs.server.host}:${configs.server.port}/`
};
