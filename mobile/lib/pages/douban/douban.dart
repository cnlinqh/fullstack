import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
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

class TagList extends StatefulWidget {
  final List _tags;
  TagList(this._tags);
  _TagListState createState() => _TagListState(_tags);
}

class _TagListState extends State<TagList> {
  final List _tags;
  _TagListState(this._tags);
  @override
  Widget build(BuildContext context) {
    return Container(
      width: ScreenUtil.getInstance().setWidth(1440),
      child: new ListView.builder(
        itemCount: _tags.length,
        itemBuilder: (context, index) {
          return new ListTile(
            title: new Tag(_tags[index]),
          );
        },
      ),
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
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      width: ScreenUtil.getInstance().setWidth(1440),
      height: ScreenUtil.getInstance().setHeight(1060),
      child: Column(
        children: <Widget>[
          Row(
            children: <Widget>[
              Text(_tag),
              Expanded(
                child: Text(""),
              ),
              FlatButton(
                onPressed: () {},
                child: Text("全部>"),
              ),
            ],
          ),
          GridView.builder(
            shrinkWrap: true,
            physics: NeverScrollableScrollPhysics(),
            gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 3,
              // childAspectRatio: 1.0,
            ),
            itemCount: this._subjects.length,
            itemBuilder: (context, index) {
              return Card(this._subjects[index]);
            },
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
      child: SingleChildScrollView(
        child: Column(
          children: <Widget>[
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                Container(
                  width: ScreenUtil.getInstance().setWidth(260),
                  child: Image.network(subject['cover']),
                ),
                Star(double.parse(subject['rate'])),
              ],
            ),
            Text(
              subject['title'] + "/" + subject['rate'],
              style: TextStyle(
                fontSize: 12,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class Star extends StatelessWidget {
  final double _size = 14;
  final double _rate;
  Star(this._rate);

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Container(
        width: ScreenUtil.getInstance().setWidth(70),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          children: <Widget>[
            Icon(
              _rate >= 2
                  ? Icons.star
                  : _rate > 0 ? Icons.star_half : Icons.star_border,
              size: _size,
              color: _rate >= 2
                  ? Colors.orange
                  : _rate > 0 ? Colors.orangeAccent : Colors.black,
            ),
            Icon(
              _rate >= 4
                  ? Icons.star
                  : _rate > 2 ? Icons.star_half : Icons.star_border,
              size: _size,
              color: _rate >= 4
                  ? Colors.orange
                  : _rate > 2 ? Colors.orangeAccent : Colors.black,
            ),
            Icon(
              _rate >= 6
                  ? Icons.star
                  : _rate > 4 ? Icons.star_half : Icons.star_border,
              size: _size,
              color: _rate >= 6
                  ? Colors.orange
                  : _rate > 4 ? Colors.orangeAccent : Colors.black,
            ),
            Icon(
              _rate >= 8
                  ? Icons.star
                  : _rate > 6 ? Icons.star_half : Icons.star_border,
              size: _size,
              color: _rate >= 8
                  ? Colors.orange
                  : _rate > 6 ? Colors.orangeAccent : Colors.black,
            ),
            Icon(
              _rate >= 10
                  ? Icons.star
                  : _rate > 8 ? Icons.star_half : Icons.star_border,
              size: _size,
              color: _rate >= 10
                  ? Colors.orange
                  : _rate > 8 ? Colors.orangeAccent : Colors.black,
            ),
          ],
        ),
      ),
    );
  }
}
