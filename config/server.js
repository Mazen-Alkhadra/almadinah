module.exports = {
  app: {
    name: 'almadinah-ph',
    headersTimeout: 2 * 60 * 60 * 1000 /* 2h */
  },
  cluster: {
    maxWorkersNum: 5,
  },
  session: {
    defaultSecretKey: 'almadinah-ph',
    cookieMaxAge: 30 * 24 * 60 * 60 * 1000
  },
  cookie: {
    userLanguageKey: 'languagePref'
  },
  emailServer: {
    host: '',
    port: 465,
    isSecure: true,
    userName: '',
    password: ''
  },

  urls: {
    serverBaseUrl: '',
    activationAcountApiPath: '/api/auth/account/activate',
    resetPasswordApiPath: '/api/auth/account/resetpassword',
    resetPasswordPagePath: '/resetpassword',
    getImgFromFtpApiPath: '/api/ftp/img',
    getImgFromLocalFSApiPath: '/api/fs/img',
    getDocFromFtpApiPath: '/api/ftp/doc',
    getDocFromLocalFSApiPath: '/api/fs/doc',
    getVoiceFromFtpApiPath: '/api/ftp/voice',
    getVoiceFromLocalFSApiPath: '/api/fs/voice',
    getVideoFromFtpApiPath: '/api/ftp/video',
    getVideoFromLocalFSApiPath: '/api/fs/video',
    loginWithGoogleApi: '/api/auth/google/login'
  },

  ftp: {
    host: 'ftp.scacademy.no',
    user: 'ss-6d5c52db07257210@scacademy.no',
    password: 'mM@12345'
  },

  uploads: {
    imgs: {
      reqTimeoutMS: 30 * 60 * 1000 /* 30m */,
      resTimeoutMS: 30 * 60 * 1000 /* 30m */,
      useFTP: true,
      destination: `${__dirname}/../uploads/imgs`,
      fieldName: 'img',
      limitSizeBytes: 15 * 1024 * 1024, // 15 MB
      profileImgLimitSizeBytes: 5 * 1024 * 1024 // 5 MB      
    },
    docs: {
      reqTimeoutMS: 30 * 60 * 1000 /* 30m */,
      resTimeoutMS: 30 * 60 * 1000 /* 30m */,
      useFTP: true,
      destination: `${__dirname}/../uploads/documnets`,
      fieldName: 'doc',
      limitSizeBytes: 20 * 1024 * 1024, // 20 MB
    },
    voices: {
      reqTimeoutMS: 30 * 60 * 1000 /* 30m */,
      resTimeoutMS: 30 * 60 * 1000 /* 30m */,
      useFTP: true,
      destination: `${__dirname}/../uploads/voices`,
      fieldName: 'voice',
      limitSizeBytes: 30 * 1024 * 1024, // 30 MB
    },
    videos: {
      reqTimeoutMS: 60 * 60 * 1000 /* 60m */,
      resTimeoutMS: 60 * 60 * 1000 /* 60m */,
      useFTP: true,
      destination: `${__dirname}/../uploads/videos`,
      fieldName: 'video',
      limitSizeBytes: 500 * 1024 * 1024, // 500 MB
    }
  }
};