import { from, of, concat, defer, Observable } from "rxjs";
import { webSocket } from "rxjs/webSocket";
import { ofType } from "redux-observable";
import {
  map,
  mergeMap,
  switchMap,
  catchError,
  retryWhen,
  delay,
  tap
} from "rxjs/operators";

// const from = (url = '', param = {}) =>
//   defer(() => rxFrom(fetchUtils(url, param)));

const retry = (maxAttemps = 10, interval = 1000) =>
  retryWhen(error =>
    error.pipe(
      map((err, i) => {
        if (err.errorcode !== 999) {
          throw err;
        }
        if (i + 1 > maxAttemps) {
          throw new Error("log");
        }
        return err;
      }),
      delay(interval)
    )
  );

// const errorHandling = (error, url = '', param = {}) => {
//   if (error.message === 'log') {
//     fromFetch(url, param).catch(() => {});
//     return of(popupActions.openPopup({
//       message: '网络已断开，请检查网络路线是否已连接',
//     }));
//   }
//   if (!knownExceptions.includes(error.errorcode)) {
//     Raven.captureException(
//       new Error(`${error.errorcode}-${error.message}-${error.originalMessage}`),
//       {
//         extra: {
//           url,
//           param,
//         },
//       },
//     );
//   }
//   return of(popupActions.openPopup({ message: error.message }));
// };

const actions = {
  // onSelectingMenuItem: menuItem => ({
  //   type: 'SELECT_MENU_ITEM',
  //   payload: menuItem,
  // }),

  // getHallCategories: hallCategories => ({
  //   type: 'STORE_HALL_CATEGORIES',
  //   payload: hallCategories,
  // }),

  // getHallItems: () => ({
  //   type: 'GET_HALL_ITEMS',
  // }),

  // storeHallItems: hallItems => ({
  //   type: 'STORE_HALL_ITEMS',
  //   payload: hallItems,
  // }),
  initWS: () => ({
    type: "INIT_WS"
  }),

  play: idx => ({
    type: "PLAY_VIDEO",
    payload: idx
  }),
  receiveVideo: video => ({
    type: "STORE_VIDEO",
    payload: video
  })
};

const socket$ = webSocket({
  url: "ws://35.247.82.159:8080",
  serializer: raw => raw,
  deserializer: raw => raw
});

// var enc = new TextEncoder(); // always utf-8
// console.log(enc.encode("video 1"));

export const initWSEpic = action$ =>
  action$.pipe(
    ofType("PLAY_VIDEO"),
    switchMap(() => {
      socket$.next("video 1");
      console.log(1);
      return socket$.pipe(
        map(payload => actions.receiveVideo(payload)),
        tap((payload)=>{console.log(payload)})
        // retry(),
        // catchError(error => errorHandling(error, API.hall.GETCATEGORIES)),
      );
    })
  );

export const epics = {
  initWSEpic
};

export default actions;
