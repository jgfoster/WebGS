#!/bin/bash -e
source setEnv.sh

topaz -lq << EOF
errorCount
iferr 1 stk
iferr 2 exit
run
Log instance logTypes: #(#'startup' "#'debug'" #'request' #'warning' #'error').
%
run
| app |
app := Router new
  get: '/films' do: [:req :res | 
    res send: Film films.
  ];
  get: '/films/:id/title' do: [:req :res :id | 
    res send: (Film withId: id asNumber) title.
  ];
  get: '/films/:id/views' do: [:req :res :id | 
    res send: (Film withId: id asNumber) views.
  ];
  get: '/films/:id' do: [:req :res :id | 
    res send: (Film withId: id asNumber).
  ];
  post: '/films/:id/views/:n' do: [:req :res :id :n | 
    | film views |
    film := Film withId: id asNumber.
    views := film views + n asNumber.
    film views: views.
    res send: views.
  ];
  put: '/films/:id/views/:n' do: [:req :res :id :n | 
    | film |
    film := Film withId: id asNumber.
    film views: n asNumber.
    res send: n.
  ];
  yourself.
HttpListener run: app.
%
EOF
