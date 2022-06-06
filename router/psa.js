const express = require("express");
const mongoose = require("mongoose");
const Psa = require("../models/psa");
const fs = require("fs");
const middleware = require("./../middleware/middleware");
const errorHttp = require("./../models/errorHttp");

const router = express.Router();
