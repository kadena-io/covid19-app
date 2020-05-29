(namespace "user")
(module covid-app GOVERNANCE

  (use coin)

  ;; ===============
  ;; CONTRACT GOVERANCE: Only covid-app-admin account
  ;; ===============

  (defcap GOVERNANCE ()
    "makes sure only admin account can update the smart contract"
    (enforce-guard (at 'guard (coin.details "covid-app-admin")))
  )

  ;; ===============
  ;; TABLES: user data columns
  ;; ===============

  (defschema self-certification
    ;; date and time of self certification
    ;;    always overriden with block-time
    date:time
    ;; symptom
    ;;  : true if has, flase if doesnt
    cough:bool
    fever:bool
    breath-shortness:bool
    chills:bool
    muscle-pain:bool
    fatigue:bool
    headache:bool
    sore-throat:bool
    loss-taste-smell:bool
    ;; optional comment string
    comment:string
  )

  (defschema test-img
    ;; date and time of self certification
    date:time
    ;; string of hash of image
    img-hash:string
    ;; optional comment string
    comment:string
  )

  (defschema user
    ;; TEST INFO
    ;; list of self-certifications
    self-certifications:[object:{self-certification}]
    ;; list of hashes of test result pictures
    test-imgs:[object:{test-img}]
    ;;DEMOGRAPHIC INFO -- OPTIONAL
    ;; age range of user (ie 21-30)
    age-group:string
    ;; gender of user (male | female | other)
    gender:string
    ;; country of residence of user (2 char)
    country:string
    ;; zip code of user
    zip-code:string
  )

  (deftable users:{user})

  (defcap REGISTERED-USER (user-hash:string)
    "make sure the user is registered in covid-app contract"
    (enforce-guard (at 'guard (coin.details user-hash)))
  )

  (defun register-user (user-hash:string age-group:string gender:string country:string zip-code:string)
    @doc "PUBLIC: Initiate a new user account"
    (coin.create-account user-hash (read-keyset "ks"))
    (insert users user-hash {
      "self-certifications": [],
      "test-imgs": [],
      "age-group": age-group,
      "gender": gender,
      "country": country,
      "zip-code": zip-code
    })
    (format "User {} is registered in covid-app contract"
      [user-hash])
  )

  (defun self-certify (user-hash:string cert-obj:object{self-certification})
    @doc "REGISTED-USER ONLY: upload self-certification"
    (with-capability (REGISTERED-USER user-hash)
      (with-read users user-hash
        {"self-certifications" := sc}
        (update users user-hash {
          "self-certifications": (+ sc [(+ {"date": (at 'block-time (chain-data))} cert-obj)])
        })
      )
      (format "User {} uploaded a self-certification"
        [user-hash])
    )
  )

  (defun upload-test (user-hash:string test-obj:object{test-img})
    @doc "REGISTED-USER ONLY: upload hash of test result image"
    (with-capability (REGISTERED-USER user-hash)
      (with-read users user-hash
        {"test-imgs" := ti}
        (update users user-hash {
          "test-imgs": (+ ti [(+ {"date": (at 'block-time (chain-data))} test-obj)])
        })
      )
      (format "User {} uploaded a test result image"
        [user-hash])
    )
  )

  ;write function to get the tests

)

(create-table users)
