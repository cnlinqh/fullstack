import 'package:mobile/pages/douban/card.dart' as local;
import 'package:flutter/material.dart';
import 'package:mobile/utils/client.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

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
              return local.Card(this._subjects[index]);
            },
          ),
        ],
      ),
    );
  }
}
