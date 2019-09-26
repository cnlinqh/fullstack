import 'package:flutter/material.dart';
import 'package:mobile/utils/client.dart';

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
            print(async.data);
            List list = async.data['tags'];
            print(list);
            // return Center(
            //   child: new RefreshIndicator(
            //     // child: buildListView(context, list),
            //     onRefresh: (){},
            //   ),
            // );
            return SingleChildScrollView(
              // child: buildListView(context, list),
              child: Image.network('https://img3.doubanio.com\/view\/photo\/s_ratio_poster\/public\/p2563546656.webp')
            );
          }
        }
        return Center(
          child: Text("FutureBuilder"),
        );
      },
      future: future,
    );
  }

  buildListView(BuildContext context, List list) {
    return ListView.builder(
      itemCount: list.length,
      itemBuilder: (context, index) {
        return new Tag(list[index]);
      },
    );
  }
}

class Tag extends StatefulWidget {
  final String _tag;
  Tag(this._tag);

  _TagState createState() => _TagState(this._tag);
}

class _TagState extends State<Tag> {
  final String _tag;
  List<dynamic> _subjects = [];
  _TagState(this._tag);
  @override
  void initState() {
    super.initState();
    print(_tag);
    doubanGetMovieSubjects(tag: this._tag, pageLimit: 6).then((data) {
      setState(() {
        this._subjects = data['subjects'];
        print(this._subjects);
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Column(
        children: <Widget>[
          Row(
            children: <Widget>[Text(_tag)],
          ),
          Center(
            child: Image.network(this._subjects[0]['cover'])
            // child: GridView.builder(
            //   gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
            //     crossAxisCount: 3,
            //     childAspectRatio: 1.0,
            //   ),
            //   itemCount: 6,
            //   itemBuilder: (context, index) {
            //     // return Card(_subjects[index]);
            //     //return Image.network(_subjects[index]['cover'].toString());
            //     return Text(this._subjects[index]);
            //   },
            ),
          
        ],
      ),
    );
  }
}

class Card extends StatelessWidget {
  final subject;
  Card(this.subject);

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Image.network(subject.cover),
    );
  }
}
