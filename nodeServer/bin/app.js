"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sqlServerConfig_1 = require("./sqlServerConfig");
const sql = __importStar(require("mssql"));
const app = (0, express_1.default)();
const port = 3000;
const generateUpdateCommandText = (status) => {
    var _a, _b, _c;
    let sql = `UPDATE Enochian.TWatchTowerLayout SET `;
    sql += `GovernorSigilNorth = ${(status === null || status === void 0 ? void 0 : status.north) ? 1 : 0}, `;
    sql += `GovernorSigilNorthEast = ${(status === null || status === void 0 ? void 0 : status.northeast) ? 1 : 0}, `;
    sql += `GovernorSigilEast = ${(status === null || status === void 0 ? void 0 : status.east) ? 1 : 0}, `;
    sql += `GovernorSigilSouthEast = ${(status === null || status === void 0 ? void 0 : status.southeast) ? 1 : 0}, `;
    sql += `GovernorSigilSouth = ${(status === null || status === void 0 ? void 0 : status.south) ? 1 : 0}, `;
    sql += `GovernorSigilSouthWest = ${(status === null || status === void 0 ? void 0 : status.southwest) ? 1 : 0}, `;
    sql += `GovernorSigilWest = ${(status === null || status === void 0 ? void 0 : status.west) ? 1 : 0}, `;
    sql += `GovernorSigilNorthWest = ${(status === null || status === void 0 ? void 0 : status.northwest) ? 1 : 0}, `;
    sql += `GovernorSigilStart = ${(status === null || status === void 0 ? void 0 : status.start) ? 1 : 0}, `;
    sql += `GovernorSigilEnd = ${(status === null || status === void 0 ? void 0 : status.end) ? 1 : 0}, `;
    sql += `OriginalTableLetter = '${(_a = status === null || status === void 0 ? void 0 : status.originalTableLetter) !== null && _a !== void 0 ? _a : ''}', `;
    sql += `OriginalTableIsUpper = ${(status === null || status === void 0 ? void 0 : status.originalTableIsUpper) ? 1 : 0}, `;
    sql += `ReformedTableLetter = '${(_b = status === null || status === void 0 ? void 0 : status.reformedTableLetter) !== null && _b !== void 0 ? _b : ''}', `;
    sql += `ReformedTableIsUpper = ${(status === null || status === void 0 ? void 0 : status.reformedTableIsUpper) ? 1 : 0}, `;
    sql += `GovernorAlignedTableLetter = '${(_c = status === null || status === void 0 ? void 0 : status.governorAlignedTableLetter) !== null && _c !== void 0 ? _c : ''}', `;
    sql += `GovernorAlignedTableIsUpper = ${(status === null || status === void 0 ? void 0 : status.governorAlignedTableIsUpper) ? 1 : 0} `;
    sql += `WHERE `;
    sql += `WatchTowerReferenceNumber = ${status === null || status === void 0 ? void 0 : status.watchTowerReferenceNumber} AND `;
    sql += `RowNumber = ${status === null || status === void 0 ? void 0 : status.rowNumber} AND `;
    sql += `ColumnNumber = ${status === null || status === void 0 ? void 0 : status.columnNumber}`;
    console.log(sql);
    return sql;
};
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.get('/UpdateSquare', (req, res) => {
    var sqare = JSON.parse(req.query['Square']);
    console.warn(sqare);
    var commandText = generateUpdateCommandText(sqare);
    sql.connect(sqlServerConfig_1.sqlConfig, function (err) {
        var request = new sql.Request();
        console.log(`cmd: ${commandText}`);
        request.query(commandText, function (err, recordset) {
            if (err)
                console.log(err);
            res.send(recordset === null || recordset === void 0 ? void 0 : recordset.rowsAffected);
        });
    });
});
app.get('/TAethyrs', (req, res) => {
    var commandText = 'select * from Enochian.TAethyrs';
    sql.connect(sqlServerConfig_1.sqlConfig, function (err) {
        var request = new sql.Request();
        request.query(commandText, function (err, recordset) {
            if (err)
                console.log(err);
            res.send(recordset === null || recordset === void 0 ? void 0 : recordset.recordset);
        });
    });
});
//EnochianAethyrExtendedType
app.get('/uv_Aethyrs', (req, res) => {
    var commandText = 'select * from Enochian.uv_Aethyrs';
    sql.connect(sqlServerConfig_1.sqlConfig, function (err) {
        var request = new sql.Request();
        request.query(commandText, function (err, recordset) {
            if (err)
                console.log(err);
            res.send(recordset === null || recordset === void 0 ? void 0 : recordset.recordset);
        });
    });
});
//uv_AllEntities
app.get('/uv_AllEntities', (req, res) => {
    var commandText = 'select * from Enochian.uv_AllEntities';
    sql.connect(sqlServerConfig_1.sqlConfig, function (err) {
        var request = new sql.Request();
        request.query(commandText, function (err, recordset) {
            if (err)
                console.log(err);
            res.send(recordset === null || recordset === void 0 ? void 0 : recordset.recordset);
        });
    });
});
app.get('/TAethrysDodecadia', (req, res) => {
    var commandText = 'select * from Enochian.TAethrysDodecadia';
    sql.connect(sqlServerConfig_1.sqlConfig, function (err) {
        var request = new sql.Request();
        request.query(commandText, function (err, recordset) {
            if (err)
                console.log(err);
            res.send(recordset === null || recordset === void 0 ? void 0 : recordset.recordset);
        });
    });
});
app.get('/TAethyrsSubOrder', (req, res) => {
    var commandText = 'select * from Enochian.TAethyrsSubOrder';
    sql.connect(sqlServerConfig_1.sqlConfig, function (err) {
        var request = new sql.Request();
        request.query(commandText, function (err, recordset) {
            if (err)
                console.log(err);
            res.send(recordset === null || recordset === void 0 ? void 0 : recordset.recordset);
        });
    });
});
app.get('/TAlphabet', (req, res) => {
    var commandText = 'select * from Enochian.TAlphabet';
    sql.connect(sqlServerConfig_1.sqlConfig, function (err) {
        var request = new sql.Request();
        request.query(commandText, function (err, recordset) {
            if (err)
                console.log(err);
            res.send(recordset === null || recordset === void 0 ? void 0 : recordset.recordset);
        });
    });
});
app.get('/TAlphabet', (req, res) => {
    var commandText = 'select * from Enochian.TAlphabet';
    sql.connect(sqlServerConfig_1.sqlConfig, function (err) {
        var request = new sql.Request();
        request.query(commandText, function (err, recordset) {
            if (err)
                console.log(err);
            res.send(recordset === null || recordset === void 0 ? void 0 : recordset.recordset);
        });
    });
});
app.get('/TEnochianKeys', (req, res) => {
    var commandText = 'select * from Enochian.TEnochianKeys';
    sql.connect(sqlServerConfig_1.sqlConfig, function (err) {
        var request = new sql.Request();
        request.query(commandText, function (err, recordset) {
            if (err)
                console.log(err);
            res.send(recordset === null || recordset === void 0 ? void 0 : recordset.recordset);
        });
    });
});
app.get('/TNameTypeDecode', (req, res) => {
    var commandText = 'select * from Enochian.TNameTypeDecode';
    sql.connect(sqlServerConfig_1.sqlConfig, function (err) {
        var request = new sql.Request();
        request.query(commandText, function (err, recordset) {
            if (err)
                console.log(err);
            res.send(recordset === null || recordset === void 0 ? void 0 : recordset.recordset);
        });
    });
});
app.get('/TSubQuadrantSquareColors', (req, res) => {
    var commandText = 'select * from Enochian.TSubQuadrantSquareColors';
    sql.connect(sqlServerConfig_1.sqlConfig, function (err) {
        var request = new sql.Request();
        request.query(commandText, function (err, recordset) {
            if (err)
                console.log(err);
            res.send(recordset === null || recordset === void 0 ? void 0 : recordset.recordset);
        });
    });
});
app.get('/TWatchTowerHierarchy', (req, res) => {
    var commandText = 'select * from Enochian.TWatchTowerHierarchy';
    sql.connect(sqlServerConfig_1.sqlConfig, function (err) {
        var request = new sql.Request();
        request.query(commandText, function (err, recordset) {
            if (err)
                console.log(err);
            res.send(recordset === null || recordset === void 0 ? void 0 : recordset.recordset);
        });
    });
});
app.get('/TWatchTowerLayout', (req, res) => {
    var commandText = 'select * from Enochian.TWatchTowerLayout';
    sql.connect(sqlServerConfig_1.sqlConfig, function (err) {
        var request = new sql.Request();
        request.query(commandText, function (err, recordset) {
            if (err)
                console.log(err);
            res.send(recordset === null || recordset === void 0 ? void 0 : recordset.recordset);
        });
    });
});
app.get('/TWatchTowerNameLocator', (req, res) => {
    var commandText = 'select * from Enochian.TWatchTowerNameLocator';
    sql.connect(sqlServerConfig_1.sqlConfig, function (err) {
        var request = new sql.Request();
        request.query(commandText, function (err, recordset) {
            if (err)
                console.log(err);
            res.send(recordset === null || recordset === void 0 ? void 0 : recordset.recordset);
        });
    });
});
app.get('/TWatchTowerLayout', (req, res) => {
    var commandText = 'select * from Enochian.TWatchTowerLayout';
    sql.connect(sqlServerConfig_1.sqlConfig, function (err) {
        var request = new sql.Request();
        request.query(commandText, function (err, recordset) {
            if (err)
                console.log(err);
            res.send(recordset === null || recordset === void 0 ? void 0 : recordset.recordset);
        });
    });
});
app.get('/uv_TableLayoutWAethrys', (req, res) => {
    var commandText = 'select * from Enochian.uv_TableLayoutWAethrys';
    sql.connect(sqlServerConfig_1.sqlConfig, function (err) {
        var request = new sql.Request();
        request.query(commandText, function (err, recordset) {
            if (err)
                console.log(err);
            res.send(recordset === null || recordset === void 0 ? void 0 : recordset.recordset);
        });
    });
});
app.get('/uv_Aethyrs', (req, res) => {
    var commandText = 'select * from Enochian.uv_Aethyrs';
    sql.connect(sqlServerConfig_1.sqlConfig, function (err) {
        var request = new sql.Request();
        request.query(commandText, function (err, recordset) {
            if (err)
                console.log(err);
            res.send(recordset === null || recordset === void 0 ? void 0 : recordset.recordset);
        });
    });
});
app.get('/uv_Govenors', (req, res) => {
    var commandText = 'select * from Enochian.uv_Govenors';
    sql.connect(sqlServerConfig_1.sqlConfig, function (err) {
        var request = new sql.Request();
        request.query(commandText, function (err, recordset) {
            if (err)
                console.log(err);
            res.send(recordset === null || recordset === void 0 ? void 0 : recordset.recordset);
        });
    });
});
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
