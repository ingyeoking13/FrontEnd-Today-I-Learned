//db & request (사용자가 하고싶은대로 정의 )
let db;
let request;

let clbeeIndexedDBName = "clbee-indexedDB"
let version = "0.1";
let clbeeObjectStoreName = "clbee-variable-objectStore-";

var checkIndexedDBValid = () => {

  window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
  window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
  window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

  return !(!window.indexedDB);
}

var createIndex;
var addVariableToIndexedDB;
var updateVariableToIndexedDB;
var getVariableFromIndexedDB;
var deleteVariableFromIndexedDB;

//create with clbeeIndexedDBName
function createDB() {

  /// 탐색을 돕는 Index를 생성합니다. 
  /// 굳이 쓸 필요는 없음
  function _createIndex() {
    var objectStore = db.transaction(clbeeObjectStoreName, "readwrite").objectStore(clbeeObjectStoreName);
    /// 인덱스 채워넣어주세요, 성능에 이슈 있을 경우 
    /// ... .
    // objectStore.createIndex("defaultValue", "defaultValue", {
    //   unique: false
    // });
    ///
  }
  /// 
  function _deleteVariableFromIndexedDB(keyName) {
    return new Promise((resolve, result) => {

      var request = db.transaction([clbeeObjectStoreName + version], "readwrite")
        .objectStore(clbeeObjectStoreName + version).delete(keyName);

      request.onsuccess = (e) => {
        resolve(true);
      }
      request.onerror = (e) => {
        reject(e);
      }
    });
  }

  /// objectStore에 object 를 등록합니다. 
  /// params : 등록할 object 
  function _addVariableToIndexedDB(object) {
    return new Promise((resolve, reject) => {

      var trans = db.transaction([clbeeObjectStoreName + version], "readwrite");
      var store = trans.objectStore(clbeeObjectStoreName + version);
      var req = store.add(object);

      req.onsuccess = (e) => {
        console.log("**variable ADDED**")
        console.log(object)
        resolve(object);
      }

      req.onerror = (e) => {
        reject(e);
      }
    });
  }

  function _updateVariableToIndexedDB(object) {
    return new Promise((resolve, reject) => {
      var trans = db.transaction([clbeeObjectStoreName + version], "readwrite");
      var store = trans.objectStore(clbeeObjectStoreName + version);

      var req = store.put(object);

      req.onsuccess = (e) => {
        resolve(e);
      };

      req.onerror = (e) => {
        reqject(e);
      }
    });
  }

  /// objectStore에서 object를 가져옵니다.  
  /// keyName should be variableName! 
  function _getVariableFromIndexedDB(keyName) {
    return new Promise((resolve, reject) => {

      var customerObjectStore = db.transaction(clbeeObjectStoreName + version, "readwrite").objectStore(clbeeObjectStoreName + version);
      var request = customerObjectStore.get(keyName);
      request.onsuccess = (e) => {
        resolve(request.result);
      }
      request.onerror = (e) => {
        reject(e);
      }
    });
  }

  /// Open 에 대한 Promise
  return new Promise(function (resolve, reject) {
    request = window.indexedDB.open(clbeeIndexedDBName);
    // * on success
    request.onsuccess = (e) => {
      db = e.target.result;

      // 함수 등록 
      createIndex = _createIndex;
      addVariableToIndexedDB = _addVariableToIndexedDB;
      getVariableFromIndexedDB = _getVariableFromIndexedDB;
      deleteVariableFromIndexedDB = _deleteVariableFromIndexedDB;
      updateVariableToIndexedDB = _updateVariableToIndexedDB;

      resolve(true);
    }

    request.onerror = () => {
      console.log("error occured on calling request ")

      reject(new Error("db Request Error"));
    };
    request.onupgradeneeded = function (e) {
      db = e.target.result;
      db.createObjectStore(clbeeObjectStoreName + version, {
        keyPath: "VariableName"
      });
    }
  });
}