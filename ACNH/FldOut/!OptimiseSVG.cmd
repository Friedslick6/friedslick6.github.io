@ECHO OFF
CD/D %~dp0
FOR %%A IN ("*.svg") DO (
scour -i "%%A" -o "_%%A" --set-precision=16 --create-groups --no-renderer-workaround --strip-xml-prolog --remove-descriptive-elements --enable-comment-stripping --indent=none --no-line-breaks --strip-xml-space --enable-id-stripping
::scour -i "%%A" -o "_%%A" --set-precision=16 --create-groups --no-renderer-workaround --strip-xml-prolog --remove-descriptive-elements --enable-comment-stripping --indent=none --strip-xml-space --enable-id-stripping
DEL "%%A" /Q
REN "_%%A" "%%A"
)