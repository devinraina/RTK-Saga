import { call, put, takeEvery, all} from 'redux-saga/effects';
import {  getCatsSuccess } from './catState';

function* workkGetCatsFetch() {
    const cats = yield call(fetch, 'https://api.thecatapi.com/v1/breeds');
    const formattedCats = yield cats.json();
    const formattedCatsShortened = formattedCats.slice(0, Math.min(formattedCats.length, 10));
  
    const url = yield all(formattedCatsShortened.map(data => test(data)));
  
    console.log("url", url);
    
    yield put(getCatsSuccess(customMerge(formattedCatsShortened,url)));
  }

  function customMerge(obj1, obj2) {
    let merged = { ...obj1 };
    let i=0;
    for (let key in obj2) {
      i++;
      console.log("inside loop", i);
      if (obj2.hasOwnProperty(key)) {
        merged[key] = obj1[key] && obj1[key].toString() === '[object Object]'
          ? customMerge(obj1[key], obj2[key])
          : obj2[key];
          console.log("inside if ", i);
      }
    }
    console.log("loop",i)
    return merged;
  }
  
  async function test(x) {
    const img = await fetch(`https://api.thecatapi.com/v1/images/${x.reference_image_id}`);
    const formattedImg = await img.json();
    console.log("test", formattedImg);
    return formattedImg;
  }
  
function* catSaga(){
    yield takeEvery('cats/getCatsFetch', workkGetCatsFetch);
}

export default catSaga;