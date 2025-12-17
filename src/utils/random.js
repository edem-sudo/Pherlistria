export const random = {
  uniform(range = 1){
    return Math.random() * range * 2 - range;
  },

  normal(mean = 0, stddev = 1, min = -Infinity, max = Infinity){
    let u = 0, v = 0;
    while(u === 0) u = Math.random();
    while(v === 0) v = Math.random();
    
    const value = mean + stddev * Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    return Math.max(min, Math.min(max, value));
  },

  normalFn(mean, stddev, min, max){
    return () => this.normal(mean , stddev, min, max);
  }
}