function abilityInit() {
  const options = this.$options;

  if (options.ability) {
    this.$ability =
      typeof options.ability === 'function'
        ? options.ability()
        : options.ability;
  } else if (options.parent && options.parent.$ability) {
    this.$ability = options.parent.$ability;
  }
}

function canAccess(gate, ability) {
  if (!ability) {
    return true;
  }

  if (gate.beforeEach && typeof gate.beforeEach === 'function') {
    const result = gate.beforeEach(gate, ability);
    if (!(result === null)) {
      return result;
    }
  }

  return gate._abilities().includes(ability);
}

export class Ability {
  constructor({ abilities }) {
    this._abilities = abilities;

    this.beforeEach = null;

    this.can = function (ability) {
      return canAccess(this, ability);
    };

    this.cannot = function (ability) {
      return !canAccess(this, ability);
    };
  }
}

export function install(Vue) {
  Vue.mixin({ beforeCreate: abilityInit });
}
