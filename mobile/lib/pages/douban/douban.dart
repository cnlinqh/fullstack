import 'package:flutter/material.dart';
import 'package:mobile/utils/client.dart';
import 'package:mobile/pages/douban/tag_list.dart';

class DoubanPage extends StatefulWidget {
  DoubanPage({Key key}) : super(key: key);
  _DoubanPageState createState() => _DoubanPageState();
}

class _DoubanPageState extends State<DoubanPage> {
  Future future;
  @override
  void initState() {
    super.initState();
    future = doubanGetMoviesTags();
  }

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      body: buildFutureBuilder(),
    );
  }

  FutureBuilder buildFutureBuilder() {
    return new FutureBuilder(
      builder: (BuildContext context, AsyncSnapshot async) {
        if (async.connectionState == ConnectionState.active ||
            async.connectionState == ConnectionState.waiting) {
          return new Center(
            child: new CircularProgressIndicator(),
          );
        }
        if (async.connectionState == ConnectionState.done) {
          if (async.hasError) {
            return Center(
              child: Text("ERROR"),
            );
          } else if (async.hasData) {
            List list = async.data['tags'];
            return TagList(list);
          }
        }
        return Center(
          child: Text("FutureBuilder"),
        );
      },
      future: future,
    );
  }
}