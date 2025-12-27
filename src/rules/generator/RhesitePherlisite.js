import { PHERLISITE_LIST } from '../constants/pherlisiteList.js';
import { STANDARD_COMPOSITION_TABLE } from '../composition/standardComposition.js';
import { ELEMENT_DENSITY } from '../constants/density.js';
import { UT_TRIMS } from '../constants/trims.js';
import { random } from '../../utils/random.js';

export class Rhesite_Pherlisite{ // elementArray = [lum%, ten%, cos%]; 더해서 100
  constructor(elementArray){

    this.id = Date.now();
    this.rarity = 'Rhesite';

    const [lumRatio, tenRatio, cosRatio] = elementArray;
    this.type = this.#getType(elementArray);

    const lumComp = this.#roll3LengthRatioArray(random.uniformFn(1));
    const tenComp = this.#roll3LengthRatioArray(random.uniformFn(1));
    const cosComp = this.#roll3LengthRatioArray(random.uniformFn(1));

    const [Lm, Xu, Sl] = Object.keys(STANDARD_COMPOSITION_TABLE.Rhesite.Luminite);
    const [Bt, Xo, Bm] = Object.keys(STANDARD_COMPOSITION_TABLE.Rhesite.Tenebrite);
    const [Km, Gv, Mr] = Object.keys(STANDARD_COMPOSITION_TABLE.Rhesite.Cosmite);

    this.composition = {
      [Lm]: +(lumRatio * lumComp[0] / 100).toFixed(3),
      [Xu]: +(lumRatio * lumComp[1] / 100).toFixed(3),
      [Sl]: +(lumRatio * lumComp[2] / 100).toFixed(3),

      [Bt]: +(tenRatio * tenComp[0] / 100).toFixed(3),
      [Xo]: +(tenRatio * tenComp[1] / 100).toFixed(3),
      [Bm]: +(tenRatio * tenComp[2] / 100).toFixed(3),

      [Km]: +(cosRatio * cosComp[0] / 100).toFixed(3),
      [Gv]: +(cosRatio * cosComp[1] / 100).toFixed(3),
      [Mr]: +(cosRatio * cosComp[2] / 100).toFixed(3),
    };
    this.density = this.#calcDensity(this.composition);

    this.BT = UT_TRIMS;
    this.TA = this.#rollTA();
  }
  #roll3LengthRatioArray(varianceFn){ // 더해서 100이 되는 임의의 3자리 배열 반환.
    const a = Math.max(0.001, varianceFn());
    const b = Math.max(0.001, varianceFn());
    const c = Math.max(0.001, varianceFn());

    const sum = a+b+c;

    const arr = [
      +(a / sum * 100).toFixed(3),
      +(b / sum * 100).toFixed(3),
      +(c / sum * 100).toFixed(3),
    ];
    return arr;
  }
  #rollRatio3UniqueMin(varianceFn){
    // 길이 3의 비율 배열을 생성한다.
    // 가장 작은 값이 하나만 존재할 때까지 다시 뽑는다.
    // 최솟값이 하나일 경우에만 해당 배열을 반환한다.
    while(true){
      const arr = this.#roll3LengthRatioArray(varianceFn);
      const min = Math.min(...arr);
      const count = arr.filter(v=>v === min).length;
      if(count === 1) return arr;
    }
  }
  #getType(arr){
    const idx = arr.indexOf(Math.min(...arr));
    return PHERLISITE_LIST.Rhesite[idx];
  }
  #calcDensity(composition){
    let density = 0;

    for(let key in composition){
      density += ELEMENT_DENSITY[key] * (composition[key] / 100);
    }

    return +density.toFixed(4);
  }
  #rollTA(){ // 나중에 정규분포 잘 만져서 확률 조정 필요
    return +(random.normal(40, 13, 0.001, 100)).toFixed(3);
  }
}