System.register(["scripts/src/lib/excalibur.js"], function (exports_1, context_1) {
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
    var excalibur_js_1, Character;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (excalibur_js_1_1) {
                excalibur_js_1 = excalibur_js_1_1;
            }
        ],
        execute: function () {
            Character = /** @class */ (function (_super) {
                __extends(Character, _super);
                function Character(name, lvl, health, stats) {
                    var _this = _super.call(this) || this;
                    _this.name = name || "Steve";
                    _this.lvl = lvl || 1;
                    _this.health = health || 100;
                    _this.stats = stats;
                    return _this;
                    // stats array
                    // strength, agility, charisma, endurance, intelligence, luck
                }
                return Character;
            }(excalibur_js_1.default));
            exports_1("default", Character);
        }
    };
});
//# sourceMappingURL=character.js.map