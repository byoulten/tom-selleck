import { Container } from "typedi";
import PdfService from "../services/pdfService";

var verify = require("./verify")
var express = require("express");

var router = express.Router();

//return pdf
router.get("/pdf", verify, async (req, res) => {
  if (req.query && req.query.id) {
    var pdfId = req.query.id
    var pdfService = Container.get(PdfService)

    pdfService.getPdfFromId(pdfId).then(pdf => {

      var base64 = Buffer.from(pdf, "base64")
      res.setHeader('Content-Length', base64.length);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=attachment_' + pdfId + '.pdf');
      res.send(base64);

    }).catch(err => {
      res.send(err)
    })
  }
})

module.exports = router;