System.register(["express", "jsonwebtoken", "../models/post.js", "./Route", "../utils/extractToken"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var express, jwt, post_js_1, Route_1, extractToken_1, PostRoute;
    return {
        setters: [
            function (express_1) {
                express = express_1;
            },
            function (jwt_1) {
                jwt = jwt_1;
            },
            function (post_js_1_1) {
                post_js_1 = post_js_1_1;
            },
            function (Route_1_1) {
                Route_1 = Route_1_1;
            },
            function (extractToken_1_1) {
                extractToken_1 = extractToken_1_1;
            }
        ],
        execute: function () {
            PostRoute = class PostRoute extends Route_1.Route {
                constructor() {
                    super();
                    this.router = express.Router();
                }
                registerRoute() {
                    //get post listing
                    this.router.get('/', function (req, res, next) {
                        const post = new post_js_1.Post({
                            title: 'bob',
                            subtitle: 'subtitle',
                            pictureUrl: 'url',
                            postedOnDate: '2018-01-01',
                            top: true,
                            body: '<h1>Body</h1>'
                        });
                        post.save();
                    });
                    //POST new post
                    this.router.post('/', function (req, res, next) {
                        if (req.body.title &&
                            req.body.pictureUrl &&
                            req.body.postedBy &&
                            req.body.postBody &&
                            req.body.subtitle) { }
                        else {
                            var err = new Error("Not All required fields present");
                            return next(err);
                        }
                        const token = extractToken_1.extractToken(req).substring(7);
                        if (token) {
                            jwt.verify(token, this.secret, function (err, decoded) {
                            });
                        }
                        else {
                            var err = new Error("No Token provided");
                            return next(err);
                        }
                    });
                    //PUT(upsert) post
                    this.router.put('/:id', (req, res, next) => {
                        const token = extractToken_1.extractToken(req).substring(7);
                        if (token) {
                            jwt.verify(token, this.secret, (err, decoded) => {
                            });
                        }
                        else {
                            var err = new Error("No Token provided");
                            return next(err);
                        }
                    });
                    //get one post
                    this.router.get('/:id', function (req, res, next) {
                    });
                    //post a comment
                    this.router.post('/:id/comment', (req, res, next) => {
                        if (req.body.text &&
                            req.body.user &&
                            req.body.userName) { }
                        else {
                            var err = new Error("All Fields required");
                            return next(err);
                        }
                        var newComment = {
                            text: req.body.text,
                            user: req.body.user,
                            userName: req.body.userName
                        };
                        const token = extractToken_1.extractToken(req).substring(7);
                        if (!token) {
                            var err = new Error("No Token Provied");
                            return next(err);
                        }
                        if (token) {
                            // verifies secret and checks exp
                            jwt.verify(token, this.secret, function (err, decoded) {
                                if (err) {
                                    return next(err);
                                }
                                else {
                                    //update logic to go here
                                }
                            });
                        }
                    });
                    this.router.delete('/:id/comment/:commentId', (req, res, next) => {
                        const token = extractToken_1.extractToken(req).substring(7);
                        if (!token) {
                            var err = new Error("No Token Provied");
                            return next(err);
                        }
                        if (token) {
                            // verifies secret and checks exp
                            jwt.verify(token, this.secret, (err, decoded) => {
                                if (decoded.type === "admin") {
                                    if (err) {
                                        return next(err);
                                    }
                                    else {
                                        //update logic to go here
                                    }
                                }
                                else {
                                    let err = new Error("Need admin permissions to delete comments");
                                    return next(err);
                                }
                            });
                        }
                    });
                    return this.router;
                }
            };
            exports_1("PostRoute", PostRoute);
        }
    };
});
//# sourceMappingURL=PostRoute.js.map