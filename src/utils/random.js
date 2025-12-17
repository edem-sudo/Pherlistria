export const random = {
  uniform(range = 1){ // 균등분포. 0~range 사이의 실수 하나 반환함. Math.random()은 나중에 다른 암호학적으로 안전한 함수로 바꾸기.
    return Math.random() * range;
  },

  chance(p){ // 균등분포, 0~1 사이 확률 p로 true, 아니면 false를 반환함.
    return this.uniform() < p;
  },

  int(min, max){ // 균등분포, min~max 사이의 정수 하나 반환함.
    return Math.floor(this.uniform(max - min + 1)) + min
  },

  normal(mean = 0, stddev = 1, min = -Infinity, max = Infinity){ // 정규분포. min~max 사이의 실수 하나 반환함. (평균, 표준편차, 최소, 최대) 
    let u = 0, v = 0;
    while(u === 0) u = this.uniform(1);
    while(v === 0) v = this.uniform(1);
    
    const value = mean + stddev * Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    return Math.max(min, Math.min(max, value));
  },

  normalFn(mean, stddev, min, max){ // 그냥 숫자 하나 반환하는거 말고 함수 필요할때 쓸것. (평균, 표준편차, 최소, 최대)
    return () => this.normal(mean , stddev, min, max);
  }
}