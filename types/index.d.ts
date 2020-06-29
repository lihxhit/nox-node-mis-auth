declare module 'http' {
  interface IncomingMessage {
    $nox:{
      misAuth:{
        resList:[]
      }
    }
  }
}