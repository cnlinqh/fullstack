import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:mobile/pages/douban/star.dart';
import 'package:mobile/utils/client.dart';
import 'package:url_launcher/url_launcher.dart';

class Subject extends StatefulWidget {
  final _subject;
  Subject(this._subject);
  _SubjectState createState() => _SubjectState(this._subject);
}

class _SubjectState extends State<Subject> {
  final _subject;
  var _details = null;
  _SubjectState(this._subject);

  @override
  void initState() {
    super.initState();
    doubanGetMovieSubjectDetails(this._subject['id']).then((data) {
      print(data);
      setState(() {
        this._details = data;
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Container(
        width: ScreenUtil.getInstance().setWidth(1300),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Container(
              width: ScreenUtil.getInstance().setWidth(400),
              child: InkWell(
                child: Image.network(_subject['cover']),
                onTap: () {
                  _launchURL(_subject['url']);
                },
              ),
            ),
            Container(
              width: ScreenUtil.getInstance().setWidth(800),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  Text(_buildTitle()),
                  Star(double.parse(_subject['rate']), "Horizontal"),
                  Text(_buildYearAndRegion() + " " + _buildTypes()),
                  Text(_buildDirectors()),
                  Text(_buildActors()),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  _launchURL(url) async {
    if (await canLaunch(url)) {
      await launch(url);
    } else {
      throw 'Could not launch $url';
    }
  }

  String _buildTitle() {
    return _details == null ? _subject['title'] : _details['subject']['title'];
  }

  String _buildYearAndRegion() {
    return _details == null
        ? " "
        : _details["subject"]["release_year"].toString() +
            " / " +
            _details["subject"]["region"].toString();
  }

  String _buildTypes() {
    return _details == null ? " " : _details["subject"]["types"].toString();
  }

  String _buildDirectors() {
    return _details == null ? " " : _details["subject"]["directors"].toString();
  }

  String _buildActors() {
    var actors =
        _details == null ? " " : _details["subject"]["actors"].toString();

    if (actors.length > 40) {
      actors = actors.substring(0, 40) + "...";
    }
    return actors;
  }
}
