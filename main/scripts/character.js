"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ex = require("../lib/excalibur.min.js");
var Character = (function (_super) {
    __extends(Character, _super);
    function Character(name, lvl, health, stats) {
        var _this = _super.call(this) || this;
        _this.name = name || "Steve",
            _this.lvl = lvl || 0,
            _this.maxHealth = 10 + lvl * 2,
            _this.health = health || _this.maxHealth,
            _this.stats = stats;
        return _this;
    }
    Object.defineProperty(Character.prototype, "Name", {
        get: function () {
            return this.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Character.prototype, "Lvl", {
        get: function () {
            return this.lvl;
        },
        set: function (value) {
            this.lvl = value;
            this.maxHealth = 5 + this.lvl * 2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Character.prototype, "Health", {
        get: function () {
            return this.health;
        },
        set: function (value) {
            this.health = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Character.prototype, "Stats", {
        get: function () {
            return this.stats;
        },
        set: function (value) {
            this.stats = value;
        },
        enumerable: true,
        configurable: true
    });
    Character.prototype.kill = function () {
    };
    return Character;
}(ex.Actor));
exports.default = Character;
//# sourceMappingURL=character.js.map