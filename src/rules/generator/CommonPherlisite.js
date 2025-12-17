import { PHERLISITE_LIST } from '../constants/pherlisiteList.js';
import { STANDARD_COMPOSITION_TABLE } from '../composition/standardComposition.js';
import { ELEMENT_DENSITY } from '../constants/density.js';
import { CT_TRIMS } from '../constants/trims.js';
import { random } from '../../utils/random.js'

export class Common_Pherlisite{
  constructor(type){

    if(type === 'Random') type = this.#pickType(PHERLISITE_LIST.Common);
    const base = STANDARD_COMPOSITION_TABLE.Common[type];

    this.id = Date.now();
    this.rarity = 'Common';
    this.type = type;
    
    this.composition = this.#varyComposition(base, random.normalFn(50, 50, 1, 100));
    this.density = this.#calcDensity(this.composition);
    
    this.BT = this.#pickBT();
    this.TA = this.#rollTA();
  }

  #varyComposition(base, varianceFn){ //나중에 바이옴별로 조정 필요
    const result = {};
    let total = 0;

    for(let key in base){
      const v = base[key] + varianceFn();
      result[key] = Math.max(1, v);
      total += result[key];
    }

    for(let key in result){
      result[key] = +(result[key] / total * 100).toFixed(3);
    }

    return result;
  }

  #calcDensity(composition){
    let density = 0;

    for(let key in composition){
      density += ELEMENT_DENSITY[key] * (composition[key] / 100);
    }

    return +density.toFixed(4);
  }

  #pickBT(){
    return CT_TRIMS[Math.floor(Math.random() * CT_TRIMS.length)]
  }

  #rollTA(){ // 나중에 정규분포 잘 만져서 확률 조정 필요
    return +(random.normal(40, 13, 0.001, 100)).toFixed(3);
  }

  #pickType(rarityArr){
    return rarityArr[Math.floor(Math.random() * rarityArr.length)]
  }
}

// const a = new Common_Pherlisite();
// console.log(a);