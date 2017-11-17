import React from 'react';
import PdfHtml from './pdfHtml';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { Details, Custom } from '../../components';
import fetchData from '../../utils/fetchData';
import app from '../../app';
import configs from '../../configs';
import htmlToPdf from './htmlToPdf';

export default (req, res) => {
  const routerState = {
    location: { query: '' },
    components: [
      { fetchData: Details.fetchData }
    ],
    styleMap: {
      CODE: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 2
      }
    },
    showEditor: true
  };

  const context = app.createContext({ req, res, configs,
    authenticated: req.session.user && req.session.user.authenticated
  });

  fetchData(context, routerState, (err) => {
    if (err) throw err;
    const markup = renderToString(
      React.createElement(Custom, { context: context.getComponentContext() },
      <Details {...routerState} params={{ blogId: req.body.bId }} hideComments={true} showPdfEditors={true} />
    ));
    const htmlString = renderToStaticMarkup(<PdfHtml html={markup} />);
    const doctype = '<!DOCTYPE html>';
    htmlToPdf(`${doctype}${htmlString}`).then(() => {
      res.status(200).json('DOWNLOAD_PDF_SUCCESS');
    })
    .catch((err) => {
      res.status(200).json(err);
    });
  });
};
