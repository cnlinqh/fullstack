import 'package:flutter/material.dart';
import 'package:mobile/utils/client.dart';
import 'package:english_words/english_words.dart';

class DataPage extends StatefulWidget {
  DataPage({Key key}) : super(key: key);

  _DataPageState createState() => _DataPageState();
}

class _DataPageState extends State<DataPage> {
  var _skip = 0;
  var _limit = 20;
  var _filter = "";
  var _done = false;
  var _isEnglish = false;

  final _txtFieldController = TextEditingController();

  var _dataList = <dynamic>[
    {
      "id": -1,
    }
  ];

  void _onMenuSelected(Choice result) {
    if (result.title == "Refresh") {
      _refreshData();
    } else if (result.title == "Delete All") {
      _deleteAllData();
    } else if (result.title == "Generate") {
      _prepareData();
    } else if (result.title == "English") {
      setState(() {
        this._isEnglish = !this._isEnglish;
        if (this._isEnglish) {
          _txtFieldController.text =
              generateWordPairs().take(1).first.toString();
        } else {
          _txtFieldController.text = "";
        }
      });
    }
  }

  void _addData() {
    var msg = _txtFieldController.text;
    dataAdd(msg).then((data) {
      if (data["success"]) {
        _dataList.insert(0, data['node']);
        if (_isEnglish) {
          _txtFieldController.text =
              generateWordPairs().take(1).first.toString();
        }
        setState(() {});
      }
    });
  }

  void _refreshData() {
    _skip = 0;
    _filter = "";
    _done = false;
    _dataList.removeRange(0, _dataList.length - 1);
    setState(() {});
  }

  void _deleteAllData() {
    dataDeleteAll().then((data) {
      if (data["success"]) {
        _refreshData();
      }
    });
  }

  void _prepareData() {
    dataPrepare(100, false).then((data) {
      if (data["success"]) {
        _refreshData();
      }
    });
  }

  void _retrieveData() {
    if (_done) {
      return;
    }
    dataGetPagedData(_filter, _skip, _limit).then((data) {
      print("======skip: " + _skip.toString());
      if (data["success"]) {
        List messageList = data["messages"] as List;
        if (messageList.length == 0) {
          _done = true;
        }
        _dataList.insertAll(_dataList.length - 1, messageList.toList());
        _skip = _skip + messageList.length;
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
            Row(
              children: <Widget>[
                Expanded(
                  child: TextField(
                    autofocus: false,
                    controller: _txtFieldController,
                    textAlign: TextAlign.left,
                    style: TextStyle(
                      color: Colors.blue,
                      fontSize: 20,
                    ),
                  ),
                ),
                IconButton(
                  icon: Icon(Icons.add),
                  onPressed: _addData,
                ),
                PopupMenuButton<Choice>(
                  onSelected: _onMenuSelected,
                  itemBuilder: (BuildContext context) {
                    return choices.map((Choice choice) {
                      return PopupMenuItem<Choice>(
                        value: choice,
                        child: Row(
                          children: <Widget>[
                            choice.getIcon(_isEnglish),
                            Expanded(
                              child: Text(choice.title),
                            ),
                          ],
                          mainAxisAlignment: MainAxisAlignment.center,
                          mainAxisSize: MainAxisSize.min,
                        ),
                      );
                    }).toList();
                  },
                ),
              ],
            ),
            ListTile(title: Text("Data:")),
            Expanded(
              child: ListView.separated(
                itemCount: _dataList.length,
                itemBuilder: (context, index) {
                  if (_dataList[index]['id'] == -1) {
                    _retrieveData();
                    return Container();
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

class Choice {
  Choice({
    @required this.title,
    @required this.icon,
    this.icon2,
  });

  final String title;
  final IconData icon;
  final IconData icon2;

  Icon getIcon(bool isEnglish) {
    if (this.title == "English" && isEnglish) {
      return Icon(this.icon2);
    }
    return Icon(this.icon);
  }
}

final List<Choice> choices = <Choice>[
  Choice(
    title: 'Refresh',
    icon: Icons.refresh,
    // icon2: Icons.refresh,
  ),
  Choice(
    title: 'Delete All',
    icon: Icons.delete_forever,
    icon2: Icons.delete_forever,
  ),
  Choice(
    title: 'Generate',
    icon: Icons.date_range,
    icon2: Icons.date_range,
  ),
  Choice(
    title: 'English',
    icon: Icons.check_box_outline_blank,
    icon2: Icons.check,
  ),
];
