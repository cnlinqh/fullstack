import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:mobile/pages/douban/tag.dart';
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
