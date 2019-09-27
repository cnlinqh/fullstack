import 'package:flutter/material.dart';
import 'package:mobile/pages/douban/subject.dart';
import 'package:mobile/utils/client.dart';

class TagDetails extends StatefulWidget {
  final String _tag;
  TagDetails(this._tag);

  _TagDetailsState createState() => _TagDetailsState(_tag);
}

class _TagDetailsState extends State<TagDetails> {
  final String _tag;
  static const String _loading = "##loading##";
  var _skip = 0;
  var _limit = 20;
  var _done = false;
  var _dataList = <dynamic>[
    {
      "title": _loading,
    }
  ];
  _TagDetailsState(this._tag);

  void _refreshData() {
    _skip = 0;
    _done = false;
    _dataList.removeRange(0, _dataList.length - 1);
    setState(() {});
  }

  void _retrieveData() {
    if (_done) {
      return;
    }
    doubanGetMovieSubjects(
      tag: _tag,
      pageStart: _skip,
      pageLimit: _limit,
    ).then((data) {
      List list = data['subjects'] as List;
      if (list.length == 0) {
        _done = true;
      }
      _dataList.insertAll(_dataList.length - 1, list.toList());
      _skip = _skip + list.length;
      setState(() {});
    });
  }

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      body: Container(
        child: Column(
          children: <Widget>[
            ListTile(title: Text(_tag)),
            Expanded(
              child: ListView.separated(
                itemCount: _dataList.length,
                itemBuilder: (context, index) {
                  if (_dataList[index]['title'] == _loading) {
                    _retrieveData();
                    return Container();
                  } else {
                    return Container(
                      child: Subject(_dataList[index]),
                    );
                  }
                },
                separatorBuilder: (context, index) => Divider(),
              ),
            )
          ],
        ),
      ),
    );
  }
}
