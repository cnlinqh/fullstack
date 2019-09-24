import 'package:flutter/material.dart';
import 'package:mobile/utils/client.dart';
import 'dart:io';

class DataPage extends StatefulWidget {
  DataPage({Key key}) : super(key: key);

  _DataPageState createState() => _DataPageState();
}

class _DataPageState extends State<DataPage> {
  var _skip = 0;
  var _limit = 3;
  var _filter = "";

  var _noMoreData = false;

  static const loadingTag = '##loading##';
  var _dataList = <dynamic>[
    {
      "id": -1,
      "message": loadingTag,
    }
  ];

  void _retrieveData() {
    if (_noMoreData) {
      return;
    }
    // sleep(Duration(milliseconds: 1000));
    dataGetPagedData(_filter, _skip, _limit).then((data) {
      print("========-" + _skip.toString());
      if (data["success"]) {
        List messageList = data["messages"] as List;
        if (messageList.length == 0) {
          _noMoreData = true;
        }
        _dataList.insertAll(_dataList.length - 1, messageList.toList());
        _skip = _skip + _limit;
        setState(() {});
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      // appBar: new AppBar(title: Text("Data")),
      body: Container(
        child: Column(
          children: <Widget>[
            ListTile(title: Text("Data:")),
            Expanded(
              child: ListView.separated(
                itemCount: _dataList.length,
                itemBuilder: (context, index) {
                  if (_dataList[index]['message'] == loadingTag) {
                    _retrieveData();
                    return Container(
                      child: Text(_dataList[index]['message']),
                    );
                  } else {
                    return Container(
                      child: Text(_dataList[index]['message']),
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
